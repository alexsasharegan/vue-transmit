<?php

header( 'Content-Type: application/json; charset=utf-8' );

try
{

    // Undefined | Multiple Files | $_FILES Corruption Attack
    // If this request falls under any of them, treat it invalid.
    if (
        ! isset( $_FILES['file']['error'] ) ||
        is_array( $_FILES['file']['error'] )
    )
    {
        throw new RuntimeException( 'Invalid parameters.' );
    }

    switch ( $_FILES['file']['error'] )
    {
        case UPLOAD_ERR_OK:
            break;
        case UPLOAD_ERR_NO_FILE:
            throw new RuntimeException( 'No file sent.' );
        case UPLOAD_ERR_INI_SIZE:
        case UPLOAD_ERR_FORM_SIZE:
            throw new RuntimeException( 'Exceeded filesize limit.' );
        default:
            throw new RuntimeException( 'Unknown errors.' );
    }

    // You should also check filesize here.
    if ( $_FILES['file']['size'] > pow(1024, 3) )
    {
        throw new RuntimeException( 'Exceeded filesize limit.' );
    }

    // DO NOT TRUST $_FILES['file']['mime'] VALUE !!
    // Check MIME Type by yourself.
    $finfo = new finfo( FILEINFO_MIME_TYPE );
    if ( FALSE === $ext = array_search(
            $finfo->file( $_FILES['file']['tmp_name'] ),
            [
                'jpg' => 'image/jpeg',
                'tiff' => 'image/tiff',
                'tif' => 'image/tiff',
                'png' => 'image/png',
                'gif' => 'image/gif',
            ],
            TRUE
        )
    )
    {
        throw new RuntimeException( 'Invalid file format.' );
    }

    // You should name it uniquely.
    // DO NOT USE $_FILES['file']['name'] WITHOUT ANY VALIDATION !!
    // On this example, obtain safe unique name from its binary data.
    $path = sprintf( './uploads/%s.%s',
        sha1_file( $_FILES['file']['tmp_name'] ),
        $ext
    );

    if (!file_exists('./uploads')) {
      mkdir('./uploads');
    }

    if ( ! move_uploaded_file( $_FILES['file']['tmp_name'], $path ) )
    {
        throw new RuntimeException( 'Failed to move uploaded file.' );
    }

    echo json_encode([
      'message' => 'File is uploaded successfully.',
      'url' => $path,
    ]);
}
catch ( RuntimeException $e )
{
    http_response_code(400);
    echo json_encode([
      'message' => $e->getMessage()
    ]);
}
