/**
 * Created by Kip on 11/2/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.PremisesInspectionReviewRecomGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'premisesinspectionreviewrecomgrid',
    itemId: 'premisesinspectionprocessgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recommendation_id = record.get('approval_recommendation_id');
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
                    table_name: 'tra_premises_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    storeID: 'premisesinspectiondashgridstr',
                    table_name: 'tra_premises_applications',
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
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            
            config: {
                pageSize: 10000,
                storeId: 'premisesinspectionreviewrecomstr',
                groupField: 'business_type_id',
                proxy: {
                    url: 'premiseregistration/getPremisesinspectionreviewrecomdetails'
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
            var recommendation_id = record.get('approval_recommendation_id');
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
        itemdblclick: 'showPremisesInspectionDetailsWizard'
    }, tbar:[{
            xtype: 'displayfield',
            value:'Doubleclick to proceed with Premises Inspection',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '14px',
                'margin-top': '4px'
            }
    }],

    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        text: 'Premise Name',
        flex: 1
    }, {
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
        xtype: 'gridcolumn',
        dataIndex: 'inspection_recommendation',
        text: 'inspection_recommendation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspection_type',
        text: 'Inspection Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_start_date',
        text: 'Inspection Start Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'actual_end_date',
        text: 'Inspection End Date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_status',
        text: 'Approval Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'approval_remarks',
        text: 'Approval Remarks',
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
                items: [
                    {
                        text: 'Recommendation',
                        iconCls: 'x-fa fa-chevron-circle-up',
                        handler: 'getPremisesInspectionApplicationApprovalDetails',
                        stores: '["approvaldecisionsstr"]',
                        table_name: 'tra_premises_applications'
                    }
                ]
            }
        }
    }]
});
