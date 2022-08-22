deploy:
	umi build && scp -r dist root@47.106.113.51:/usr/share/nginx
