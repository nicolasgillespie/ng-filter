$('html').data('ng-filter', 'true');

var NG_Filter = function(list, start_filter) {
  if(start_filter === undefined) { start_filter = null; }
  var _this = this;

  _this.construct = function() {
    var exists = _this.objectsExist();
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
    $(list).children().each(function(index) {
      var child = $(this);
      var rel = child.attr('rel');
      child.addClass('ng-filter-obj').attr('data-filter', rel);

      if(rel.indexOf(',') > -1) {
        var rel_array = rel;
        rel_array = rel_array.split(',');

        jQuery.each(rel_array, function(index) {
          var one_rel = rel_array[index];
          if(one_rel.indexOf(' ') == 0) {
            one_rel = one_rel.replace(' ', '');
          }

          var inArray = jQuery.inArray(one_rel, filters);
          if(inArray == -1) {
            filters.push(one_rel);
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

    var filter_txt_all = document.createElement('div');
    /* change the content of the prepend('All') to change the text of all HERE */
    $(filter_txt_all).addClass('ng-filter-txt').attr('data-filter', 'all').prepend('All');
    $(filter_list).append(filter_txt_all);

    while(filters.length > int) {
      var filter_value = filters[int];
      var filter_txt = document.createElement('div');

      $(filter_txt).addClass('ng-filter-txt').attr('data-filter', filter_value).html(filter_value);
      $(filter_list).append(filter_txt);

      int++;
    }

    $(list).prepend(filter_list);
  }

  _this.show_cat_image = function() {
    $('.ng-filter-txt').each(function(index) {

      $(this).on('click', function(e){
        $(this).addClass('ng-selected');
        var cat = $(this).attr('data-filter');

        $(list).children('.ng-filter-obj').each(function(index) {
          var img_cat = $(this).attr('data-filter');

          if(img_cat.indexOf(',') != -1) {
            if(img_cat.indexOf(', ') != -1) {
              img_cat = img_cat.split(', ');
            } else {
              img_cat = img_cat.split(',');
            }
          }

          if(img_cat != cat) {
            $(this).addClass('ng-invisible');
          } else if(img_cat == cat && $(this).hasClass('ng-invisible')) {
            $(this).removeClass('ng-invisible');
          }
          if(jQuery.inArray(cat, img_cat) != -1) {
            $(this).removeClass('ng-invisible');
          }
          if(cat == 'all') {
            $(this).removeClass('ng-invisible');
          }
        });
      });
    });

    if(start_filter != 'all') {
      $(list).children('.ng-filter-obj').each(function(index) {
        var img_cat = $(this).attr('data-filter');

        if(img_cat.indexOf(',') != -1) {
          if(img_cat.indexOf(', ') != -1) {
            img_cat = img_cat.split(', ');
          } else {
            img_cat = img_cat.split(',');
          }
        }

        if(img_cat != start_filter) {
          $(this).addClass('ng-invisible');
        } else if(img_cat == start_filter && $(this).hasClass('ng-invisible')) {
          $(this).removeClass('ng-invisible');
        }
        if(jQuery.inArray(start_filter, img_cat) != -1) {
          $(this).removeClass('ng-invisible');
        }
      });
    }
  }

  _this.construct();
}
