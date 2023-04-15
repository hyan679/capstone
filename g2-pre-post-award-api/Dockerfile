FROM python:3.7.10
WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

COPY . .

ENV FLASK_APP=run.py
ENV FLASK_ENV=development

EXPOSE 5000:5000

CMD ["python3", "run.py"]