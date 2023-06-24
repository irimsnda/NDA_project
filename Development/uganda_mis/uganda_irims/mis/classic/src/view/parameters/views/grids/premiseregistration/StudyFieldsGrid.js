Ext.define('Admin.view.parameters.views.grids.premiseregistration.StudyFieldsGrid', {
    extend: 'Admin.view.parameters.views.grids.ParametersGrid',
    alias: 'widget.studyfieldsgrid',
    title: 'Study Fields',
    itemId: 'studyfieldsgrid',
    store: 'studyfieldsstr',
    tbar: [{
        xtype: "button",
        text: "Add Study Field",
        iconCls: 'x-fa fa-plus',
        margin: '0 0 5 0',
        action: 'add',
        form: 'studyfieldfrm',
        ui: 'soft-green',
        handler: 'showAddParameterFrm'
    }, {
        xtype: "button",
        text: "Merge Study Fields",
        itemId: "mergeBtn",
        iconCls: 'fa fa-compress',
        margin: '0 0 5 0',
        action: 'merge',
        mergeGrid: 'studyfieldsmergegrid',
        form: 'studyfieldsmergefrm',
        ui: 'soft-green',
        disabled: true,
        handler: 'showMergeParameterWin',
    }, {
        xtype: 'exportbtn',
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        store: 'studyfieldsstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    listeners:{
        beforerender:function(me){
            me.store.removeAll();
            me.store.clearFilter();
            me.store.proxy.extraParams = {all: 1};
            me.store.load();
            me.columns[me.columns.length - 1].widget.menu.items = [{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Record',
                form: 'studyfieldfrm',
                action: 'edit',
                action_url: 'premiseregistration/parameters/studyfield',
                entity: 'studyfields',
                store: 'studyfieldsstr',
                handler: 'showEditParameterFrm'
            },{
                text: 'Enable',
                iconCls: 'fa fa-undo',
                tooltip: 'Enable Record',
                action: 'enable',
                action_url: 'premiseregistration/parameters/studyfield',
                action_type: 'enable',
                entity: 'studyfields',
                store: 'studyfieldsstr',
                handler: 'doDeleteParameter'
            },{
                text: 'Delete (soft)',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                action: 'delete',
                action_url: 'premiseregistration/parameters/studyfield',
                action_type: 'soft',
                store: 'studyfieldsstr',
                entity: 'regions',
                handler: 'doDeleteParameter'
            }, {
                text: 'Delete',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete Record',
                form: 'studyfieldfrm',
                action: 'delete',
                action_url: 'premiseregistration/parameters/studyfield',
                action_type: 'actual',
                store: 'studyfieldsstr',
                entity: 'studyfields',
                handler: 'doDeleteParameter'
            }]
        }

    },
});