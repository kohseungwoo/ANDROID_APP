package com.tb_android_app

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash;

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "TB_ANDROID_APP"  // ← 앱 이름과 동일해야 함

    override  fun onCreate(savedInstanceState: Bundle?) {
        RNBootSplash.init(this, R.style.BootSplashTheme)
        super.onCreate(savedInstanceState)
    }

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
