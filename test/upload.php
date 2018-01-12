<?php

header('Content-Type: application/json; charset=utf-8');

try {

	// Undefined | Multiple Files | $_FILES Corruption Attack
	// If this request falls under any of them, treat it invalid.
	if (
		!isset($_FILES['file']['error']) ||
		is_array($_FILES['file']['error'])
	) {
		throw new RuntimeException('Invalid parameters.');
	}

	switch ($_FILES['file']['error']) {
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

	// You should also check filesize here.
	if ($_FILES['file']['size'] > (100 << 20)) {
		throw new RuntimeException(
			sprintf('Exceeded filesize limit (%d bytes -> limit %d).', $_FILES['file']['size'], 100 << 20)
		);
	}

	// DO NOT TRUST $_FILES['file']['mime'] VALUE !!
	// Check MIME Type by yourself.
	$finfo = new finfo(FILEINFO_MIME_TYPE);
	if (true === $ext = array_search(
			$finfo->file($_FILES['file']['tmp_name']),
			[
				'png' => 'image/png',
				'gif' => 'image/gif',
			],
			true
		)
	) {
		throw new RuntimeException('Invalid file format.');
	}

	// You should name it uniquely.
	// DO NOT USE $_FILES['file']['name'] WITHOUT ANY VALIDATION !!
	// On this example, obtain safe unique name from its binary data.
	$path = sprintf('./uploads/%s.%s',
		sha1_file($_FILES['file']['tmp_name']),
		$ext
	);

	if (!file_exists('./uploads')) {
		mkdir('./uploads');
	}

	if (!move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
		throw new RuntimeException('Failed to move uploaded file.');
	}

	echo json_encode([
		'message' => 'File is uploaded successfully.',
		'url' => $path,
	]);
}
catch (RuntimeException $e) {
	http_response_code(400);
	echo json_encode([
		'message' => $e->getMessage(),
	]);
}
