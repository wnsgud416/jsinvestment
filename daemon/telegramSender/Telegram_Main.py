import Telegram_Sender
import sys

Argv=sys.argv

print(Argv)
print(len(Argv))
Message=""
for i in range(1, len(Argv)):
    Message=Message+Argv[i]+" "

print(Message)

TelegramBot = Telegram_Sender.TelegramBot()
TelegramBot.loadConfig()
TelegramBot.SendMessage(Message)



