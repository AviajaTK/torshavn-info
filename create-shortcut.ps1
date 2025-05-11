$WshShell = New-Object -comObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut("$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\Torshavn Info.lnk")
$Shortcut.TargetPath = "$PWD\start-app.bat"
$Shortcut.WorkingDirectory = "$PWD"
$Shortcut.Save() 