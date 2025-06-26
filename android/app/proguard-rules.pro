# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# React Native 기본 규칙
-keep class com.facebook.** { *; }
-keep class com.facebook.jni.** { *; }
-keepclassmembers class ** {
    @com.facebook.react.bridge.ReactMethod *;
}
-keepclassmembers class ** {
    @com.facebook.react.uimanager.annotations.ReactProp *;
}
-keepclassmembers class ** {
    @com.facebook.react.uimanager.annotations.ReactPropGroup *;
}

# Hermes 관련 규칙
-keep class com.facebook.hermes.** { *; }
-keepclassmembers class com.facebook.hermes.** { *; }

# 추가적인 사용자 정의 규칙 (필요 시)
-dontwarn okio.**
-dontwarn com.squareup.okhttp.**
