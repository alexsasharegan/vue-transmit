<?php

header('Content-Type: application/json; charset=utf-8');

try {
	if (!file_exists('./uploads')) {
		mkdir('./uploads');
  }

  $errors = is_array($_FILES['file']['error'])
    ? $_FILES['file']['error']
    : [$_FILES['file']['error']];

	foreach ($errors as $err) {
    switch ($err) {
      case UPLOAD_ERR_OK:
        break;
      case UPLOAD_ERR_NO_FILE:
        throw new RuntimeException('No file sent.');
      case UPLOAD_ERR_INI_SIZE:
      case UPLOAD_ERR_FORM_SIZE:
        throw new RuntimeException(
          sprintf('Exceeded filesize limit. upload_max_filesize: %s', ini_get("upload_max_filesize"))
        );
      default:
        throw new RuntimeException('Unknown errors.');
    }
  }

  $sizes = is_array($_FILES['file']['size'])
    ? $_FILES['file']['size']
    : [$_FILES['file']['size']];

  $max_size = 100 << 20;
	foreach ($sizes as $size) {
    // You should also check filesize here.
    if ($size > $max_size) {
      throw new RuntimeException(
        sprintf(
          'Exceeded filesize limit (%d bytes -> limit %d).',
          $size,
          $max_size
        )
      );
    }
  }

  $tmp_names = is_array($_FILES['file']['tmp_name'])
    ? $_FILES['file']['tmp_name']
    : [$_FILES['file']['tmp_name']];
  $paths = [];

  foreach($tmp_names as $tmp) {
    // DO NOT TRUST $_FILES['file']['mime'] VALUE !!
    // Check MIME Type by yourself.
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    if (true === $ext = array_search(
        $finfo->file($tmp),
        [
          'png' => 'image/png',
          'gif' => 'image/gif',
        ],
        true
      )
    ) {
      throw new RuntimeException(
        sprintf('Invalid file format: %s.', $finfo->file($tmp))
      );
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES['file']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    $path = sprintf('./uploads/%s.%s', sha1_file($tmp), $ext);
    array_push($paths, $path);

    if (!move_uploaded_file($tmp, $path)) {
      throw new RuntimeException('Failed to move uploaded file.');
    }
  }

	echo json_encode([
		'message' => 'File is uploaded successfully.',
		'url' => $paths,
	]);
}
catch (RuntimeException $e) {
	http_response_code(400);
	echo json_encode([
		'message' => $e->getMessage(),
	]);
}
