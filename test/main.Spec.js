var expect = chai.expect;

wait = ms => new Promise(res => setTimeout(res, ms));

describe('Campus Explorer - ', function() {
  this.timeout(15000000);
  this.UI_DELAY = 10;

  before(function(done) {
    karmaHTML.index.open();

    //karmaHTML.index.onstatechange fires when the Document is loaded
    //now the tests can be executed on the DOM
    karmaHTML.index.onstatechange = function(ready) {
      //if the #Document is ready, fire tests
      //the done() callback is the jasmine native async-support function
      if (ready) done();
    };
  });

  beforeEach(function(done) {
    karmaHTML.index.reload();

    karmaHTML.index.onstatechange = function(ready) {
      if (ready) done();
    };
  });

  describe('Basic stuff - ', function() {

    it('should have the title "Campus Explorer"', function() {
      var _document = karmaHTML.index.document;
      expect(_document.title).to.equal('Campus Explorer');
    });

    it('dropdown menu should have init value without any selection', async function() {
      var _document = karmaHTML.index.document;
      _document.querySelector('.nav-item[data-type=courses]').click();
      await wait(this.UI_DELAY);
      _document.querySelector('.transformations .icon-plus').click();
      await wait(this.UI_DELAY);
      expect(_document.querySelector('.transformations-container .operators select').value).to.equal('COUNT');
      expect(_document.querySelector('.transformations-container .operators select option[value="COUNT"]').getAttribute('selected')).to.equal('selected');
    });

    it('uncheck a checkbox should remove the checkec property', async function() {
      var _document = karmaHTML.index.document;
      _document.querySelector('.nav-item[data-type=courses]').click();
      await wait(this.UI_DELAY);
      _document.querySelector('#courses-columns-field-audit').click();
      await wait(this.UI_DELAY);
      _document.querySelector('#courses-columns-field-audit').click();
      await wait(this.UI_DELAY);
      let checked = _document.querySelector('#courses-columns-field-audit').getAttribute('checked');
      expect(checked).not.to.equal('checked');
    });

    it('adding transformation in courses tab should not add keys to columns in rooms tab', async function() {
      var _document = karmaHTML.index.document;
      _document.querySelector('.nav-item[data-type=courses]').click();
      await wait(this.UI_DELAY);
      _document.querySelector('.transformations .icon-plus').click();
      await wait(this.UI_DELAY);
      _document.querySelector('.transformations-container input').value = 'newkey';
      event = _document.createEvent("HTMLEvents");
      event.initEvent("keyup", true, true);
      event.eventName = "keyup";
      _document.querySelector('.transformations-container input').dispatchEvent(event);
      await wait(this.UI_DELAY);
      _document.querySelector('.nav-item[data-type=rooms]').click();
      await wait(this.UI_DELAY);
      expect(_document.querySelector('#tab-courses .columns .transformation')).not.to.equal(null);
      expect(_document.querySelector('#tab-rooms .columns .transformation')).to.equal(null);
    });

  });

});
