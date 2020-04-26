Yii2 Yandex Maps API
====================

* [Source code](https://github.com/rootlocal/yii2-yandexmaps)

## Install
```
composer require rootlocal/yii2-yandexmaps
```
or add

```json
"rootlocal/yii2-yandexmaps": "dev-master",
```

to the require section of your composer.json.

#### usage:
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