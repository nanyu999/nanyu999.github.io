第一次进行迁移时：

```python
python manage.py db migrate -m "init tables"
python manage.py db upgrade
```

后续进行字段更新时：

```python
python manage.py db migrate # 检查模型字段是否修改,如果改变,就产生新的迁移文件.
python manage.py db upgrade # 对迁移文件进行迁移
```

