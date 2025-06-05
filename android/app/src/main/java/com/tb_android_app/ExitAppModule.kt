package com.tb_android_app

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import android.os.Build

class ExitAppModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "ExitApp"
    }

    @ReactMethod
    fun exitApp() {
        val activity = currentActivity
        if (activity != null) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                // API 21 이상: 액티비티 종료 및 태스크 제거
                activity.finishAndRemoveTask()
            } else {
                // API 21 미만: 액티비티 종료
                activity.finish()
            }
        }

         android.os.Process.killProcess(android.os.Process.myPid())
         System.exit(0)
    }
}
