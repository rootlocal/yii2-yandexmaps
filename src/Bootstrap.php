<?php

namespace rootlocal\widgets\yandexmaps;

use yii\base\BootstrapInterface;
use yii\base\Application;
use yii\i18n\PhpMessageSource;

/**
 * Class Bootstrap
 * Application bootstrap process
 *
 * @see \yii\base\BootstrapInterface
 *
 * @author Alexander Zakharov <sys@eml.ru>
 * @package rootlocal\widgets\yandexmaps
 */
class Bootstrap implements BootstrapInterface
{
    /**
     * {@inheritdoc}
     * @param Application $app the application currently running
     */
    public function bootstrap($app)
    {
        // add module I18N category
        if (!isset($app->i18n->translations['yandexmaps'])) {
            $app->i18n->translations['yandexmaps'] = [
                'class' => PhpMessageSource::class,
                'sourceLanguage' => 'en-US',
                'basePath' => __DIR__ . '/messages',
            ];
        }
    }
}