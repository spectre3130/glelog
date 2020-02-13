const Like = require('../logs/like.model');
const Views = require('../logs/views.model');

exports.findTodayTopFiveViews = async () => {
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date();
    end.setHours(23,59,59,999);
    const views = await Views.aggregate([ 
        { $match: { created_at: { $gte: start, $lt: end } } },
        { $group: { _id: '$post_id', count: { $sum: 1 } } },
        { $sort: { count: -1, post_id: -1 } },
        { $limit : 5 }
    ]);
    
    return views;
}