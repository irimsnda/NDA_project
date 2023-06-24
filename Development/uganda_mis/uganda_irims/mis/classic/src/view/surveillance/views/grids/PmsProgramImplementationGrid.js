/**
 * Created by Kip on 3/4/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PmsProgramImplementationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmsprogramimplementationgrid',
   
    width: '100%',
    autoScroll: true,
    autoHeight: true,
    headers: false,
    height: Ext.Element.getViewportHeight() - 225,
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
        text: 'Add Program Implementation Details',
        winTitle: 'Program Implementation Details',
        winWidth: '40%',
        iconCls: 'x-fa fa-plus',
        childObject : 'pmsprogramimplementationfrm',
        handler: 'addProgramImplementationDetails',
        ui: 'soft-green'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'PMS Implementation Programs',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore(),
                grid=this.up('grid'),
                mainTabPnl = grid.up('#contentPanel'),
                 activeTab = mainTabPnl.getActiveTab(),
                program_id=activeTab.down('hiddenfield[name=id]').getValue();
            store.getProxy().extraParams={
                program_id:program_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }/*, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Section: {[values.rows[0].data.section_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }*/],
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                //groupField: 'section_id',
                storeId: 'pmsprogramsimplementationtr',
                proxy: {
                    url: 'surveillance/getPmsProgramsImplementation'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'program_implementation',
        text: 'Name/Identity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'year_of_implementation',
        text: 'Year of Implementation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'implementationstart_date',
        text: 'Implementation Start Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },{
        xtype: 'gridcolumn',
        dataIndex: 'implementationend_date',
        text: 'Implementation End Date',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'program_name',
        text: 'Program Name',
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
                    winTitle: 'Program Implementation Details',
                    winWidth: '40%',
                    iconCls: 'x-fa fa-plus',
                    childObject : 'pmsprogramimplementationfrm',
                    handler: 'showProgramImplementationEdit',
                    stores: '[]'
                }, {
                    text: 'View Plan Implementation Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'View Plan Implementation Details',
                    action: 'edit',
					
                    childObject : 'pmsprogramplansgrid',
					childObjectTitle:'PMS Plan Implementation Details',
                    handler: 'showProgramImplementationPlans',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'pms_program_implementationplan',
                    storeID: 'pmsprogramsimplementationtr',
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
