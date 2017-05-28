var NG_Filter = function(list, start_filter = null) {
  var _this = this;

  _this.construct = function() {
    var exists =_this.objectsExist();
    var filters = new Array();

    if(exists) {
      if(start_filter == null) {
        start_filter = 'all';
      }

      _this.get_filters(filters);
      _this.insert_filters(filters);
      _this.show_cat_image();

    }
  }

  _this.objectsExist = function() {
    var exists = false;

    if($('html').find($(list)).get(0) != null) {
      exists = true;
    }

    return exists;
  }

  _this.get_filters = function(filters) {
    $(list).children('a').each(function(index) {
      var child = $(this);
      var rel = child.attr('rel');
      child.attr('data-filter', rel);

      if(rel.indexOf(', ') > -1) {
        var rel_array = rel;
        rel_array = rel_array.split(', ');

        jQuery.each(rel_array, function(index) {
          var inArray = jQuery.inArray(rel_array[index], filters);
          if(inArray == -1) {
            filters.push(rel_array[index]);
            child.attr('data-filter', rel_array[index]);
          }
        });

      } else {
        var inArray = jQuery.inArray(rel, filters);
        if(inArray == -1) {
          filters.push(rel);
        }
      }

      filters.sort();
      child.attr('rel', start_filter)
    });

    // return filters;
  }

  _this.insert_filters = function(filters) {
    var filter_list = document.createElement('div');
    var div = document.createElement('div');
    var int = 0;

    $(filter_list).addClass('ng-filter-list');

    while(filters.length > int) {
      var filter_value = filters[int];
      var filter_txt = document.createElement('div');

      $(filter_txt).addClass('ng-filter-txt').html(filter_value);
      $(filter_list).append(filter_txt);

      int++;
    }

    // filters.each();

    $(list).prepend(filter_list);
  }

  _this.show_cat_image = function() {
    $('.ng-filter-txt').each(function(index) {

      $(this).on('click', function(e){
        var cat = $(this).html();

        $(list).children('a').each(function(index) {
          console.log($(this).attr('data-filter'));
          var img_cat = $(this).attr('data-filter');
          img_cat = img_cat.split(', ');

          if(img_cat != cat) {
            $(this).addClass('ng-invisible');
          } else if(img_cat == cat && $(this).hasClass('ng-invisible')) {
            $(this).removeClass('ng-invisible');
          }
          if(jQuery.inArray(cat, img_cat) != -1) {
            $(this).removeClass('ng-invisible');
          }
        });
      });
    });
  }

  _this.construct();
}

  //
  // _this.fn_find_object = function(the_filter) {
  //   the_filter.each(function() {
  //     var objThis = this;
  //     var objInfo = new Object();
  //
  //     objInfo.class = 'map';
  //
  //     var objFn = function(param) {
  //       NG_App.log(param);
  //
  //       _this.create_map(param.obj);
  //       NG_App.Functions.resize_map(param.obj);
  //
  //       return param;
  //     }
  //
  //     NG_App.Functions.newObj(objThis, objFn, objInfo);
  //   });
  // }
  //
  // _this.create_map = function() {
  //   google.maps.event.addDomListener(window, 'load', _this.init_map);
  // }
  //
  // _this.init_map = function(index) {
  //   var param = $('#map-homepage').data('param');
  //   var mapCanvas = param.obj.get(0);
  //
  //   var mapOptions = {
  //     center: _NG_var.villes.mtl,
  //     zoom: 9
  //   }
  //
  //   var map = new google.maps.Map(mapCanvas, mapOptions);
  //
  //   NG_App.Functions.setMapOptions(map, param);
  //
  //
  // }
