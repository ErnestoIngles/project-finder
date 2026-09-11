function pf {
    $target_dir = & pf-cli @args
    if ($target_dir -and (Test-Path -Path $target_dir)) {
        Set-Location -Path $target_dir
    }
}