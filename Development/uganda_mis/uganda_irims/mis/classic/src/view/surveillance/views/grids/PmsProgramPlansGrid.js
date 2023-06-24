/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsProgramPlansGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmsprogramplansgrid',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    height: Ext.Element.getViewportHeight() - 225,
    width: '100%',
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
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        ui: 'footer',
        height: 60,
        defaults: {
            labelAlign: 'top',
            margin: '-5 5 0 5',
            labelStyle: "color:#595959;font-size:13px"
        },
        items: [{
            xtype: 'button',
            text: 'Add Annual PMS Plan Details',
            iconCls: 'x-fa fa-plus',
            action: 'add',
            ui: 'soft-green',
            handler: 'showAddPmsProgramPlanWinFrm',
            childXtype: 'pmsprogramplansfrm',
            winTitle: 'PMS Plan Details',
            winWidth: '70%',
            stores: '[]'
        },'->', {
            xtype: 'displayfield',
            name: 'program',
            fieldLabel: 'Program Name',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        }, {
            xtype: 'tbseparator',
            width: 20
        }, {
            xtype: 'displayfield',
            name: 'program_implementation',
            fieldLabel: 'Program Plan Implementation',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        }, {
            xtype: 'tbseparator',
            width: 20
        },{
            xtype: 'displayfield',
            name: 'implementation_timeline',
            fieldLabel: 'Implementation Start-End Date',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px'
            }
        },  {
            xtype: 'hiddenfield',
            name: 'program_implementation_id'
        }
        ]
    }
],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Pms Plans',
    bbar:[ {
        text: 'Back to Plan Implementation List',
        iconCls: 'x-fa fa-backward',
        ui: 'soft-purple',
        childObject:'pmsprogramimplementationgrid',
        handler: 'funcBacktoProgramImplementationList'
    },
    {
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                program_implementation_id = grid.down('hiddenfield[name=program_implementation_id]').getValue();
            store.getProxy().extraParams = {
                program_implementation_id: program_implementation_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Region Name: {[values.rows[0].data.region_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                groupField:'region_name',
                storeId: 'pmsprogramplansstr',
                proxy: {
                    url: 'surveillance/getPmsProgramPlans'
                }
            },
            isLoad: true
        }
    },
    
    columns: [{
        
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region Name',
        flex: 1
    },{
        
        xtype: 'gridcolumn',
        dataIndex: 'district_name',
        text: 'Districts Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sampling_site',
        text: 'Sampling Site',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'category_name',
        text: 'Product Category',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'product',
        text: 'Product',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dosage_form',
        text: 'Dosage Form',
        hidden: true,
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'product_form',
        hidden: true,
        text: 'Product Form',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'device_type',
        hidden: true,
        text: 'Device Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        hidden: true,
        text: 'Common Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'strength_txt',
        text: 'Strength',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_brand',
        text: 'Number of Brands to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_batch',
        text: 'Number of batch per brand to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'pack',
        text: 'Unit Pack',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'number_of_unitpack',
        text: 'Number of unit pack per batch to be Collected',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_samples',
        text: 'Total number of samples to be Collected',
        flex: 1
    }, {
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
                    tooltip: 'Edit Record',
                    action: 'edit',
                    handler: 'showEditPmsProgramPlanWinFrm',
                    childXtype: 'pmsprogramplansfrm',
                    winTitle: 'PMS PLan',
                    winWidth: '70%',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'pms_program_plans',
                    storeID: 'pmsprogramplansstr',
                    action_url: 'surveillance/deleteSurveillanceRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteSurveillanceWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
