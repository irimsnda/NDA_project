/**
 * Created by Kip on 11/25/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ProcessFormsGrid', {
    extend: 'Admin.view.administration.views.grids.KeyFormsGrid',
    xtype: 'processformsgrid',
    height: Ext.Element.getViewportHeight() - 196,
    header: true,
    title: 'Forms',
    width: '',
    //frame: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    tbar: [ {
        xtype: 'exportbtn'
    }],
    export_title: 'Forms',
    listeners: {
        itemclick: 'onProcessFormClick'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }]
});