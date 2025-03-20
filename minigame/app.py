from flask import Flask, jsonify, request, render_template
from functools import wraps
import psycopg2
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('game.html')

def get_db_connection():
    """Database connection factory"""
    return psycopg2.connect(
        dbname='mediarate',
        user='oliver',
        password=os.environ.get('DB_PASSWORD'),
        host='localhost'
    )

def db_handler(f):
    """Decorator to handle database connections"""
    @wraps(f)
    def wrapper(*args, **kwargs):
        conn = get_db_connection()
        try:
            result = f(conn, *args, **kwargs)
            conn.commit()
            return result
        except Exception as e:
            conn.rollback()
            return jsonify({'error': str(e)}), 500
        finally:
            conn.close()
    return wrapper

@app.route('/api/films', methods=['GET'])
@db_handler
def get_films(conn):
    cur = conn.cursor()
    cur.execute("SELECT id, title, vote_average, poster_path FROM films ORDER BY RANDOM() LIMIT 2;")
    rows = cur.fetchall()
    films = [
        {"id": row[0], "title": row[1], "vote_average": row[2]}
        for row in rows
    ]
    cur.close()
    return jsonify(films)

if __name__ == '__main__':
    app.run(debug=True)