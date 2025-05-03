# How to Apply the Hook
## Requirements

- BlueStacks
- Python (3.12.2)
- Frida (16.7.0)
- ADB (1.0.41)


# Installing Frida
- Run the following command:
```
pip install frida==16.7.0 frida-tools==13.6.1
```

## Creating an instance of an Android on BlueStacks:
- Click "Instance" > "Fresh Instance"
- In the version selection window:
- Set Android Version to Android 11
- Choose the ABI Configuration as "x86 & ARM"
- Choose High Performance (optional)
- Click Create

## Enabling root in the newly created instance
- Go to C:\ProgramData\BlueStacks_nxt
- Edit the bluestacks.conf file
- Edit the following properties:
```
bst.feature.rooting="1"
bst.instance.Rvc64.enable_root_access="1"
```

## Setting up frida-server
- Access the following URL:
 https://github.com/frida/frida/releases/download/16.7.0/frida-server-16.7.0-android-x86_64.xz
- Save to any location on your PC, renaming to frida-server for making things easier
- Download Platform Tools:
https://dl.google.com/android/repository/platform-tools-latest-windows.zip
- For convenience, go to your Environment Variables and add to PATH variable the path containing the platform tools (Optional)
- Run the command:
```
adb connect 127.0.0.1:5555
adb push PATH_TO_FRIDA_SERVER/frida-server /data/local/tmp -s 127.0.0.1:5555
adb -s 127.0.0.1:5555 shell
su
cd /data/local/tmp
chmod 755 frida-server
./frida-server & 
```

## Using JADX to decompile the APK (Optional)
This step is only shown to demonstrate the whole reverse engineering process but it's not mandatory to execute the hook
- Download JADX-GUI in the following URL:
https://github.com/skylot/jadx/releases/download/v1.5.1/jadx-gui-1.5.1-win.zip
- Open the jadx-gui-1.5.1.exe
- Go to File > Open Files and select the APK to decompile, in this case it'll be ds-test.apk
- Go to Text Search, select all search definitions and search the string we want to modify "This is a Test App", in this case it doesn't have any kind of obfuscation or encryption and JADX will successfully find it
![image](https://github.com/user-attachments/assets/12b084c8-965d-4723-b956-e8dc8f97c860)
![image](https://github.com/user-attachments/assets/c27a0a41-ea2b-4417-b193-752ca3e03b78)
Now we know how the app handles the string

## Running the frida script to hook and modify the target string
- Run the "hook_script.js" that is available in the repository by executing the following command:
```
frida -U -f com.ds.testapp -l hook_script.js
```

## Screenshot Evidence
![image](https://github.com/user-attachments/assets/9a6454ee-0c85-4b30-951d-add6ed6fd442)



