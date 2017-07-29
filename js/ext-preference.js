// Generated by CoffeeScript 1.12.7
(function() {
  var clear_button, github_button, port_input, saveHint, save_button, server_input;

  server_input = $('#input_server');

  port_input = $('#input_port');

  save_button = $('#buttonSave');

  clear_button = $('#buttonClear');

  github_button = $('#buttonGithub');

  saveHint = $('#saveHint');

  browser.storage.local.get(['cnServer', 'cnPort']).then(function(result) {
    if (result['cnServer'] && result['cnServer'] !== '') {
      server_input.val(result['cnServer']);
    }
    if (result['cnPort'] && result['cnPort'] !== '') {
      return port_input.val(result['cnPort']);
    }
  });

  save_button.click(function() {
    browser.storage.local.set({
      cnServer: server_input.val().trim(),
      cnPort: port_input.val().trim()
    });
    saveHint.text('设置保存成功');
    return setTimeout((function() {
      return location.reload();
    }), 1000);
  });

  clear_button.click(function() {
    server_input.val('');
    return port_input.val('');
  });

  github_button.click(function() {
    return window.open('https://github.com/amastigote');
  });

}).call(this);
