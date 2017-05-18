var queue = require('queue');

var work_q = queue(concurrency=1,autostart=1);
work_q.autostart = 1;
work_q.concurrency=1;
work_q.timeout = 10000;

