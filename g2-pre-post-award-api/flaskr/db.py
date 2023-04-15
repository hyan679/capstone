import pymysql
import pandas as pd
# connect to database
'''
#public database
host = "seartenmdb.crtkt9pfprmx.us-east-2.rds.amazonaws.com"
port = 3306
user = "admin"
password = "SeartenMarketplaceftw2021"
database = "masterdb"
'''
#database of our group
#cloned from public database
host = "119.91.210.228"
port = 3306
user = "root"
password = "SeartenMarketplaceftw2021"
database = "masterdb"

charset="utf8"
def getdata(sql='', action='all'):
    conn = pymysql.connect(host=host,port=port,user=user,password=password,database=database,charset=charset)
    with conn:
        with conn.cursor(cursor=pymysql.cursors.DictCursor) as cursor:
            num = cursor.execute(sql)
            return eval(f'cursor.fetch{action}()')
    
def modifydata(sql=''):
    conn = pymysql.connect(host=host,port=port,user=user,password=password,database=database,charset=charset)
    with conn:
        with conn.cursor(cursor=pymysql.cursors.DictCursor) as cursor:
            cursor.execute(sql)
            conn.commit()
                
def pd_getdata(sql=''):
    conn = pymysql.connect(host=host,port=port,user=user,password=password,database=database,charset=charset)
    with conn:
        res = pd.read_sql(sql, conn)
    return res
                

