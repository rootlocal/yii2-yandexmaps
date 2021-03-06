Yii2 Yandex Maps API
====================

[![Latest Stable Version](https://img.shields.io/packagist/v/rootlocal/yii2-yandexmaps.svg)](https://packagist.org/packages/rootlocal/yii2-yandexmaps)

* [Source code](https://github.com/rootlocal/yii2-yandexmaps)

## Install
```
composer require rootlocal/yii2-yandexmaps
```
or add

```json
"rootlocal/yii2-yandexmaps": "~1.0",
```

to the require section of your composer.json.

#### Example usage config 1:

config: 
```php
<?php

return [
    
    // ...
    
    'components' => [
        
        // ...
    
        'assetManager' => [
            
            'bundles' => [
                \rootlocal\widgets\yandexmaps\ApiYandexMapAsset::class => [
                    'version' => '2.1',
                    'language' => 'ru-RU',
                    'apiKey' => 'MY_API_KEY'
                ],
            ],
            
            // ...
        ],
        
        // ...
    ]
];
```

view:
```php

<?php

use yii\web\View;
use rootlocal\widgets\yandexmaps\YandexMapWidget;

/** @var View $this */
?>

<?= YandexMapWidget::widget([
        'content' => $this->render('yamapscontent'),
        'htmlOptions' => ['class' => 'yamap'],
        'options' => [
            'center' => [xx.xx, yy.yy],
            'zoom' => 16,
            'controls' => ['zoomControl'],
            'placemarks' => [
                [
                    'position' => [xx.xx, yy.yy],
                    'content' => [
                        'hintContent' => 'test',
                        'balloonContentHeader' => 'test',
                        'balloonContentBody' => 'test',
                        'balloonContentFooter' => 'test',
                    ],
                ],
            ],
        ]
    ]) ?>
```

#### Example usage config 2:

```php
<?php

use yii\web\View;
use rootlocal\widgets\yandexmaps\YandexMapWidget;

/** @var View $this */
?>

<?= YandexMapWidget::widget([
        'apiKey' => 'MY_API_KEY',
        'language' => 'ru-RU',
        'content' => $this->render('yamapscontent'),
        'htmlOptions' => ['class' => 'yamap'],
        'options' => [
            'center' => [xx.xx, yy.yy],
            'zoom' => 16,
            'controls' => ['zoomControl'],
            'placemarks' => [
                [
                    'position' => [xx.xx, yy.yy],
                    'content' => [
                        'hintContent' => 'test',
                        'balloonContentHeader' => 'test',
                        'balloonContentBody' => 'test',
                        'balloonContentFooter' => 'test',
                    ],
                ],
            ],
        ]
    ]) ?>
```