/**
 * Created by Kip on 8/27/2018.
 */
Ext.define('Admin.view.widgets.CustomizableWindow', {
    extend: 'Ext.window.Window',
    xtype: 'customizablewindow',
    autoShow: true,
    modal: true,
    layout: 'fit',
    autoScroll: true,
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    },
    doDestroy: function () {
        Ext.un(this.resizeListeners);
        this.callParent();
    }
});