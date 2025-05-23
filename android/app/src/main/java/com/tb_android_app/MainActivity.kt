package com.tb_android_app

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash;
import android.graphics.Color
import android.view.View
import android.app.ActivityManager
import android.graphics.BitmapFactory

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "TB_ANDROID_APP"  // ← 앱 이름과 동일해야 함

    override  fun onCreate(savedInstanceState: Bundle?) {
        RNBootSplash.init(this, R.style.BootSplashTheme)
        super.onCreate(savedInstanceState)

        // 최근 앱 썸네일에 로고 표시
        val icon = BitmapFactory.decodeResource(resources, R.drawable.bootsplash_logo)
        setTaskDescription(
            ActivityManager.TaskDescription(
                "TB_ANDROID_APP",  // 앱 이름
                icon,
                Color.WHITE        // 썸네일 배경색
            )
        )
    }


    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
