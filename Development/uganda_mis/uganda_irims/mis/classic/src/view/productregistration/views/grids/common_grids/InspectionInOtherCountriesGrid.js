Ext.define('Admin.view.productregistration.views.grids.common_grids.InspectionInOtherCountriesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'inspectioninothercountriesGrid',
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
        childXtype: 'inspectioninothercountriesfrm',
        winTitle: 'Inspection In Other Countries',
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
    export_title: 'inspectionInOtherCountries',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function(){
            this.up('grid').fireEvent('refresh', this, 'tra_otherstates_productgmpinspections');
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
                storeId: 'inspectioninothercountriesStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'tra_otherstates_productgmpinspections'
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
        dataIndex: 'recognisedassessments_ctrregion',
        hidden: true,
        text: 'Assessment Region',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'country',
        text: 'Country',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approving_authority',
        text: 'Approving Authority',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gmpapplication_reference',
        text: 'GMP Application Reference',
        flex: 1
    },{
        xtype: 'datecolumn',
        dataIndex: 'inspection_date',
        format: 'Y-m-d',
        text: 'Inspection Date',
        flex: 1
    },{
        xtype: 'datecolumn',
        dataIndex: 'approval_date',
        text: 'Approval Date',
        format: 'Y-m-d',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approved_productlines',
        text: 'Approved Product Line(s)',
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
                    childXtype: 'inspectioninothercountriesfrm',
                    winTitle: 'Inspection In Other Countries',
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
                    table_name: 'tra_otherstates_productgmpinspections',
                    storeID: 'inspectioninothercountriesStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    bind: {
                        disabled: '{hideDeleteButton}'
                    },
                }
                ]
            }
        }
    }]
});
