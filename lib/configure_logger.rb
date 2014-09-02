require 'logger'

log_file = File.open("./lib/log/app.log", 'w')
log_file.sync = true
$logger = Logger.new log_file
$logger.level = Logger::INFO
