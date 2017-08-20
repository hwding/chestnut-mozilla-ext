// Generated by CoffeeScript 1.12.7
(function() {
  var bindListenerForEditHref, currentPage, escapeChars, filteredTags, loadItems, packageFilterParam, urlObject, urlString;

  currentPage = 0;

  filteredTags = [];

  urlString = window.location.href;

  urlObject = new URL(urlString);

  this.server = urlObject.searchParams.get('server');

  this.port = urlObject.searchParams.get('port');

  loadItems = function(payload, container, btnPre, btnSuc, pageIndicator, filteredTagsSpan) {
    pageIndicator.closest('div').css('visibility', 'hidden');
    return listItems(payload, function(result) {
      var i, item, len, ref;
      filteredTagsSpan.empty();
      if (filteredTags.length === 0) {
        filteredTagsSpan.append('<kbd>all</kbd>');
      } else {
        filteredTagsSpan.append("<kbd>" + (filteredTags.join('</kbd> <kbd>')) + "</kbd>");
      }
      if (result['stat'] === Status.COMPLETE) {
        currentPage = result['obj']['currentPage'];
        if (result['obj']['isFirst']) {
          btnPre.attr('disabled', true);
        } else {
          btnPre.attr('disabled', false);
        }
        if (result['obj']['isLast']) {
          btnSuc.attr('disabled', true);
        } else {
          btnSuc.attr('disabled', false);
        }
        pageIndicator.text(currentPage);
        container.empty();
        ref = result['obj']['items'];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          container.append(generateRow(item));
        }
        bindListenerForEditHref();
        window.scrollTo(0, 0);
      } else {
        if (result['stat'] === Status.ERROR) {
          btnPre.attr('disabled', true);
          btnSuc.attr('disabled', true);
          container.empty();
          container.append("<tr style='font-size: 14px'><td colspan='4'>无结果</td></tr>");
        }
      }
      return pageIndicator.closest('div').css('visibility', 'visible');
    });
  };

  bindListenerForEditHref = function() {
    return $('.editHref').click(function() {
      return showEditModal(this);
    });
  };

  packageFilterParam = function(rawVal, page) {
    filteredTags = rawVal.replace(/[， 、]/g, ',').split(',').map(function(e) {
      return e.trim();
    }).filter(function(e) {
      return e !== '';
    }).map(function(e) {
      return escape(e);
    });
    return {
      page: page,
      tag: filteredTags
    };
  };

  $(function() {
    var btnClear, btnFilter, btnPre, btnSuc, container, filteredTagsStrong, inputTags, pageIndicator;
    container = $('#tableBody');
    btnPre = $('.btnPre');
    btnSuc = $('.btnSuc');
    pageIndicator = $('.pageIndicator');
    btnFilter = $('#btnFilter');
    btnClear = $('#btnClear');
    inputTags = $('#filterByTags');
    filteredTagsStrong = $('#filteredTags');
    btnPre.click(function() {
      return loadItems({
        page: currentPage - 2
      }, container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    });
    btnSuc.click(function() {
      return loadItems({
        page: currentPage
      }, container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    });
    loadItems({
      page: 0
    }, container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    btnFilter.click(function() {
      return loadItems(packageFilterParam(inputTags.val(), 0), container, btnPre, btnSuc, pageIndicator, filteredTagsStrong);
    });
    btnClear.click(function() {
      inputTags.val('');
      return btnFilter.trigger('click');
    });
    return getTags(function(result) {
      return new Awesomplete(document.getElementById('filterByTags'), {
        list: result['obj'].map(function(e) {
          return escapeChars(unescape(e.trim()));
        }),
        filter: function(text, input) {
          return Awesomplete.FILTER_CONTAINS(text, input.match(/[^,]*$/)[0]);
        },
        item: function(text, input) {
          return Awesomplete.ITEM(text, input.match(/[^,]*$/)[0]);
        },
        replace: function(text) {
          var before;
          before = this.input.value.match(/^.+,\s*|/)[0];
          return this.input.value = before + text + ", ";
        },
        minChars: 1,
        maxItems: 5,
        autoFirst: true
      });
    });
  });

  escapeChars = function(string) {
    return string.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  this.generateRow = function(item) {
    var tagsBadges;
    tagsBadges = item['tags'].map(function(e) {
      return "<span class='badge badge-default' style='font-size: 12px;vertical-align: middle'>" + (escapeChars(unescape(e['name']))) + "</span>";
    }).join('&nbsp;');
    return "<tr><td style='vertical-align: middle'>" + item['id'] + "</td><td style='vertical-align: middle'><a href='" + item['url'] + "'>" + (escapeChars(unescape(item['title']))) + "</a></td><td style='vertical-align: middle'>" + tagsBadges + "</td><td style='font-size: 14px; vertical-align: middle'><a href='#' class='editHref'><i class='fa fa-pencil fa-1'></i>&nbsp;编辑</a></td></tr>";
  };

}).call(this);
