from datetime import timedelta


def format_duration(total: timedelta):
    min = total // 60
    sec = total % 60
    return "{:0>2.0f}:{:0>2.0f}".format(min, sec)
