# 운영 배포 방법
## 안드로이드
> 1. src\components\Config.js > ENV 환경 'PROD' 변경
> 2. cd android > ./gradlew bundleRelease 실행
> 3. android > app > build > outputs > bundle > release > app-release.abb 파일 확인 
> 4. 구글플레이콘솔 로그인 > 앱 클릭 > 테스트 및 출시 > 프로덕션 > app-release.abb 파일 업로드 

#  안드로이드 실행명령어
> npx react-native run-android

#  로그보기 <br>
> react-native log-android

# RN APP BUNDLE 생성 명령어 
### (구글 스토어에 업로드 하기 위함)
### path : {project}/android/app/build/outputs/apk
> cd android > ./gradlew bundleRelease // release 모드 


#  RN APK 생성 명령어 
### path : {project}/android/app/build/outputs/apk

> cd android > ./gradlew assembleDebug // debug 모드 (로컬환경)
<br>
> cd android > ./gradlew assembleRelease // release 모드 (안드로이드 환경)

# RN APK 생성 전 openSSL 설치
> https://slproweb.com/products/Win32OpenSSL.html

# RN APK 생성 전 gradle.properties 설정 
> STORE_FILE=build/outputs/e2utb-key.keystore // keyStore 정보 관리 (키생성방법 : https://yd-developer.tistory.com/20)
> ex.JKS)  keytool -genkey -v -keystore C:\workspace\2.TB\TB_ANDROID_APP\android\app\build\outputs\e2utb-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias e2utb-releaseKey -storetype PKCS12 
> ex.KEYSTORE)  keytool -genkey -v -keystore C:\workspace\2.TB\TB_ANDROID_APP\android\app\build\outputs\e2utb-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias e2utb-releaseKey -storetype PKCS12

<br> STORE_PASSWORD=etou_1qa2ws
<br> KEY_ALIAS=e2utb-releaseKey
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

