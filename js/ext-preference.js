// Generated by CoffeeScript 1.12.7
(function() {
  var __portKey, __serverKey, clear_button, github_button, port_input, save_button, server_input;

  server_input = $('#input_server');

  port_input = $('#input_port');

  save_button = $('#buttonSave');

  clear_button = $('#buttonClear');

  github_button = $('#buttonGithub');

  __serverKey = 'cnServer';

  __portKey = 'cnPort';

  browser.storage.local.get([__serverKey, __portKey]).then(function(result) {
    if (result[__serverKey] && result[__serverKey] !== '') {
      server_input.val(result[__serverKey]);
    }
    if (result[__portKey] && result[__portKey] !== '') {
      return port_input.val(result[__portKey]);
    }
  });

  save_button.tooltip({
    template: '<div class="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
    title: '设置已保存',
    trigger: 'manual',
    placement: 'right'
  });

  save_button.click(function() {
    var conf;
    conf = {};
    conf[__serverKey] = server_input.val().trim();
    conf[__portKey] = port_input.val().trim();
    browser.storage.local.set(conf);
    save_button.tooltip('show');
    return setTimeout((function() {
      return save_button.tooltip('hide');
    }), 1000);
  });

  clear_button.click(function() {
    server_input.val('');
    return port_input.val('');
  });

  github_button.click(function() {
    return window.open('https://github.com/amastigote/amastigote-browser-ext');
  });

}).call(this);
