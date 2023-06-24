Ext.define('Admin.view.productregistration.views.grids.common_grids.ConductedProductClinicaltrialGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'conductedproductclinicaltrialGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'conductedproductclinicaltrialfrm',
        winTitle: 'Product Clinical Trials',
        winWidth: '60%',
        bind: {
            disabled: '{isReadOnly}'
        },
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'conductedproductclinicaltrial',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this, 'tra_productreg_clinicalresearchsdetails');
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'conductedproductclinicaltrialStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'tra_productreg_clinicalresearchsdetails'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 50
    },{
        xtype: 'gridcolumn',
        dataIndex: 'clinical_researchorganisation',
        text: 'Research Organization',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_date',
        text: 'Trial Application Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_reference',
        text: 'Trial Application Reference',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'contact_person',
        text: 'Contact Person',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'contact_person_email',
        text: 'Contact Person Email',
        flex: 1,
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit',
                    action: 'edit',
                    childXtype: 'conductedproductclinicaltrialfrm',
                    winTitle: 'Product Clinical Trials',
                    winWidth: '60%',
                    handler: 'showEditConfigParamWinFrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_productreg_clinicalresearchsdetails',
                    storeID: 'conductedproductclinicaltrialStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    bind: {
                        disabled: '{hideDeleteButton}'
                    },
                }
                ]
            }
        }
    }]
});
