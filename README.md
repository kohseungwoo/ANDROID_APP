#  안드로이드 실행명령어
> npx react-native run-android
> 
#  로그보기 <br>
> react-native log-android

# RN APP BUNDLE 생성 명령어 (구글 스토어에 업로드 하기 위함)
> cd android > ./gradlew bundleRelease // release 모드

#  RN APK 생성 명령어 (> {project}/android/app/build/outputs/apk)
> cd android > ./gradlew assembleDebug // debug 모드 (로컬환경)
<br>
> cd android > ./gradlew assembleRelease // release 모드 (안드로이드 환경)

# RN APK 생성 전 openSSL 설치
> https://slproweb.com/products/Win32OpenSSL.html

# RN APK 생성 전 gradle.properties 설정
> STORE_FILE=build/outputs/e2utb-key.keystore // keyStore 정보 관리
<br> STORE_PASSWORD=etou_1qa2ws
<br> KEY_ALIAS=release-key
<br> KEY_PASSWORD=etou_1qa2ws

# .\app\build.gradle
    android {
        ndkVersion rootProject.ext.ndkVersion
        buildToolsVersion rootProject.ext.buildToolsVersion
        compileSdk rootProject.ext.compileSdkVersion

        namespace "com.tb_android_app"
        defaultConfig {
            applicationId "com.tb_android_app"
            minSdkVersion rootProject.ext.minSdkVersion
            targetSdkVersion rootProject.ext.targetSdkVersion
            versionCode 1
            versionName "1.0"
        }
        signingConfigs {
            debug {
                storeFile file('debug.keystore')
                storePassword 'android'
                keyAlias 'androiddebugkey'
                keyPassword 'android'
            }
            release {
                storeFile file(project.property("STORE_FILE"))
                storePassword project.property("STORE_PASSWORD")
                keyAlias project.property("KEY_ALIAS")
                keyPassword project.property("KEY_PASSWORD")
            }
        }
        buildTypes {
            debug {
                signingConfig signingConfigs.debug
            }
            release {
                signingConfig signingConfigs.release
                minifyEnabled enableProguardInReleaseBuilds
                proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
            }
        }
    }

