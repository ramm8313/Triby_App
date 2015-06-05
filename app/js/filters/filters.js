MyApp.filter('customDate', function($filter) {
    return function(date) {
        var currentDate, diffDays, filterDate, temp, oneDay;
        oneDay = 24*60*60*1000;
        currentDate = new Date();
        filterDate = new Date(date);
        diffDays = Math.round(Math.abs((currentDate.getTime() - filterDate.getTime())/(oneDay)));
        if(diffDays == 0){
            temp = 'Today';
            temp += $filter('date')(date, " @ h:mma");
            return temp;
        }
        else if(diffDays == 1){
            temp = 'Yesterday';
            temp += $filter('date')(date, " @ h:mma");
            return temp;
        }
        else{
            return $filter('date')(date, "MMM dd, yyyy @ h:mma");
        }
    };
});