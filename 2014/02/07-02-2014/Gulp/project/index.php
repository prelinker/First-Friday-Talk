<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Demo gallery</title>
        
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link href="css/styles.css" rel="stylesheet" />
    </head>
    <body>

        <section id="least">
            
            <div class="least-preview"></div>
            
            <h1 id="gallery">Gallery</h1>
            
            <ul class="least-gallery">
<?php

        class GalleryFilterIterator extends RecursiveFilterIterator {
            public function accept() {
                return preg_match('/\d+\.jpg/', $this->current()->getFilename());
            }
        }

        $filter     = new GalleryFilterIterator( new RecursiveDirectoryIterator('img/photos/big/') );
        $iterator   = new RecursiveIteratorIterator($filter, RecursiveIteratorIterator::SELF_FIRST);

        foreach ($iterator as $filePath => $fileInfo) {
            echo '    <li>'.PHP_EOL;
            echo sprintf('        <a href="%s" title="Image n°%s">'.PHP_EOL, $filePath, $fileInfo->getBasename('.jpg') );
            echo sprintf('            <img src="img/photos/thumbnails/%s" alt="Dummy" />'.PHP_EOL, $fileInfo->getFilename() );
            echo '        </a>'.PHP_EOL;
            echo '    </li>'.PHP_EOL;
        }

?>
            </ul>

        </section>

        <script src="js/all.min.js"></script>

    </body>
</html>