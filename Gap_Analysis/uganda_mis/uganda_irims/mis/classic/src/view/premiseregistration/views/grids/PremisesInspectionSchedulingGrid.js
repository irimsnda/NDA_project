/**
 * Created by Kip on 11/1/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisesInspectionSchedulingGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisesinspectionschedulinggrid',
    
    itemId: 'premisesinspectionprocessgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    appDetailsReadOnly:1,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
                return 'valid-row';
            }else{
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    
    tbar:[{
        text: 'Search Registered Premises',
        iconCls: 'x-fa fa-search',
        ui:'soft-green',
        margin:2,
        winWidth: '70%',
        tooltip: 'Search',
        action: 'search_premise',
        childXtype: 'inspectionpremiseselectiongrid',
        winTitle: 'Premises Selection List'
    },{
            xtype: 'displayfield',
            value: 'Double click to enter the inspection recommendation details!!',
            fieldStyle: {
                'color':'green'
            }
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    width: '60%',
                    table_name: 'tra_premises_applications',
                    managerInspection: 1,
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',{
                    xtype: 'button',
                    text: 'Print Inspection Schedule',
                    iconCls: 'x-fa fa-print',
                    ui: 'soft-green',
                    handler: 'funcPrintPremisesInspectionSchedules',
                    
                    toaster: 0,
                    winWidth: '50%'
                },{
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-green',
                    name: 'submit_selected',
                    disabled: true,
                    toaster: 0,
                    action: 'process_submission_btn',
                    winWidth: '50%'
                }
            ]
        }
    ],
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    },{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: ': {[values.rows[0].data.business_type]} [{rows.length}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'business_type_id',storeId: 'premisesinspectionprocessgridStr',
                proxy: {
                    url: 'premiseregistration/getPremisesinspectionschedulingDetails'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
                return true;
            }else{
                return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
            }
        },
        afterrender: function () {
            var grid = this,
                sm = grid.getSelectionModel();
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.inspection_id) {
                        sm.select(rowIndex, true);
                    }
                });
            });
        },
        itemdblclick: 'showPremisesInspectionDetailsWizard'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'inspection_recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        tdCls:'wrap-text',
        text: 'Inspection Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_start_date', tdCls:'wrap-text',
        text: 'Inspection Start Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_end_date', tdCls:'wrap-text',
        text: 'Inspection End Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no', tdCls:'wrap-text',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name', tdCls:'wrap-text',
        text: 'Premise Name',
        flex: 1
    },   {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'Region/Province Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        text: 'District Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Physical Address',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        text: 'Email Address',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspect_recomm',
        text: 'Inspection Recommendation',
        flex: 1
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
                items: [
                    {
                        text: 'Preview Premises',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showPremApplicationMoreDetails'
                    }, {
                        text: 'Preview Previous Inspections',
                        iconCls: 'x-fa fa-bars',
                        appDetailsReadOnly: 1,
                        handler: 'showPreviousPremisesInspection'
                    },{
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'tra_premiseinspection_applications',
                        storeID: 'premisesinspectionprocessgridStr',
                        action_url: 'premiseregistration/deletePremiseRegRecord',
                        action: 'actual_delete',
                        handler: 'doDeletePremiseInspectionOtherDetailsWin'
                    }
                ]
            }
        }
    }]
});
