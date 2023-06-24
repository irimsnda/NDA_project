Ext.define('Admin.view.plugins.CKeditor', {   
    extend : 'Ext.form.field.TextArea',
    alias : 'widget.ckeditor',
    xtype: 'ckeditor',
    initComponent : function(){
        this.callParent(arguments);
        this.on('afterrender', function(){
            Ext.apply(this.CKConfig ,{
                    height : this.getHeight()
            });
            this.editor = CKEDITOR.replace(this.inputEl.id,this.CKConfig);
            this.editorId =this.editor.id;
        },this);
    },
    onRender : function(ct, position){
        if(!this.el){
            this.defaultAutoCreate ={
                tag : 'textarea',
                autocomplete : 'off'
            };
        }
        this.callParent(arguments)
    },
    setValue  : function(value){
        this.callParent(arguments);
        if(this.editor){
            this.editor.setData(value);
        }
    },
    getRawValue: function(){
        if(this.editor){
            return this.editor.getData()
        }else{
            return''
        }
    },

    afterrender:function(ct,position){
        CKEDITOR.on('instanceReady',function(e){
            var o = Ext.ComponentQuery.query('ckeditor[editorId="'+ e.editor.id +'"]'),
            comp = o[0];
           // e.setRules('p',{indent:false,breakAfterOpen:false});
            e,editor.dataProcessor.writer.setRules(blockTags)
            e.editor.resize(comp.getWidth(), comp.getHeight())
            comp.on('resize',function(c,adjWidth,adjHeight){
                c.editor.resize(adjWidth, adjHeight)
            })
        });

    }
});





// Ext.define('Admin.view.plugins.CKeditor', {
//     extend: 'Ext.form.field.TextArea',
//     alias: 'widget.ckeditor',
    
//     defaultListenerScope: true,
    
//     listeners: {
//       instanceReady: 'instanceReady',
//       resize: 'resize',
//       boxready : 'onBoxReady'
//     },

//     editorId: null,
    
//     editor:null,
//     CKConfig: {},

//     constructor: function () {
//         this.callParent(arguments);
//     },

//     initComponent: function () {
//         this.callParent(arguments);
//         this.on("afterrender", function () {
//             Ext.apply(this.CKConfig, {
//                 height: this.getHeight(),
//                 width: this.getWidth()
//             });

//             this.editor = CKEDITOR.replace(this.inputEl.id, this.CKConfig);
//             this.editorId = this.inputEl.id;
//             this.editor.name = this.name;

//             this.editor.on("instanceReady", function (ev) {
//                 this.fireEvent(
//                     "instanceReady",
//                     this,
//                     this.editor
//                 );
//             }, this);

//         }, this);
//     },
//     instanceReady : function (ev) {
//         // Set read only to false to avoid issue when created into or as a child of a disabled component.
//         ev.editor.setReadOnly(false);
//     },
//     onRender: function (ct, position) {
//         if (!this.el) {
//             this.defaultAutoCreate = {
//                 tag: 'textarea',
//                 autocomplete: 'off'
//             };
//         }
//         this.callParent(arguments)
//     },

//     setValue: function (value) {
//         this.callParent(arguments);
//         if (this.editor) {
//             this.editor.setData(value);
//         }
//     },

//     getValue: function () {
//         if (this.editor) {
//             return this.editor.getData();
//         }
//         else {
//             return ''
//         }
//     },

//     destroy: function(){
//         // delete instance
//         if(!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
//             delete CKEDITOR.instances[this.editorId];
//         }

//     },

//     resize: function(win,width, height,opt) {
//         var eid = this.editorId,
//             editor = CKEDITOR.instances[this.editorId];     
//         if (!Ext.isEmpty(CKEDITOR.instances[this.editorId])){
//             CKEDITOR.instances[this.editorId].resize(width, height);
//         }       
//     },
//     onBoxReady : function(win, width, height, eOpts){
//         // used to hook into the resize method
//     }
// });