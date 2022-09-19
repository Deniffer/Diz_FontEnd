deploy:
	umi build && scp -r dist root@47.106.113.51:/usr/share/nginx


deploy2:
	umi build && scp -r dist root@121.41.1.196:/usr/share/nginx


