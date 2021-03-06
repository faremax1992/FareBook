var requests = require( '../../requests/request.js' );
var utils = require( '../../utils/util.js' );

Page( {
  data: {
    id: null,
    loadidngHidden: false,
    bookData: null
  },
  onLoad: function( option ) {
    this.setData({
      id: option.id
    });
  },
  onReady: function() {
    var id = this.data.id;
    var _this = this;
    requests.requestBookDokDetail(
      id, 
      {fields: 'image,summary,publisher,title,rating,pubdate,author,author_intro,catalog'}, 
      ( data ) => {
        if(data.summary === '') data.summary = 'Opps! 这本书没有简介！';
        _this.setData({
          bookData: data
        });
    }, () => {
      wx.navigateBack();
    }, () => {
      _this.setData( {
        loadidngHidden: true
      });
    });
  }
});