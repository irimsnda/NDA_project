/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productnotifications.views.grids.commongrids.ProductNotificationApprovalGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productnotificationsvctr',
    xtype: 'productnotificationapprovalgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
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
                    width: '70%',
                    table_name: 'tra_product_applications',
                    beforeLoad: function () {
                        this.up('grid').fireEvent('refresh', this);
                    }
                },
                '->',, {
                    xtype: 'exportbtn', ui: 'soft-green',
                    text:'Export Applications'
                },
                {
                    xtype: 'button',
                    text: 'Submit Application(s)',
                    iconCls: 'x-fa fa-check',
                    ui: 'soft-purple',
                    name: 'submit_selected',
                    disabled: true,
                    table_name: 'tra_product_applications',
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
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'productnotificationapprovalstr',
                proxy: {
                    url: 'productnotification/getProductNotificationApprovalApplications'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: true
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=submit_selected]').setDisabled(false);
                
                grid.down('button[name=batch_approval_recommendation]').setDisabled(false);
            }
        },
        beforeselect: function (sel, record, index, eOpts) {
            var recommendation_id = record.get('recommendation_id');
            if (recommendation_id > 0) {
              //  return true;
            } else {
               // return false;
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[name=submit_selected]').setDisabled(true);
                grid.down('button[name=batch_approval_recommendation]').setDisabled(true);
            }
        }
    }, selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    tbar: [{
          text:'Batch Approval Recommendation',
          name:'batch_approval_recommendation',
         disabled: true,
          table_name: 'tra_product_applications',
          stores: '["productApprovalDecisionsStr"]',
          handler:'getBatchApplicationApprovalDetails',
          approval_frm: 'batchproductapprovalrecommfrm',
          iconCls: 'x-fa fa-chevron-circle-up',
          margin: 5
      
},'->',{
      xtype: 'exportbtn'
  }, {
      xtype: 'tbspacer'
  }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Ref Number',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Device Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'classification_name',
        text: 'Class Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'device_type',
        text: 'Device Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Status',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'evaluator_recommendation',
        text: 'Prechecking Recommendation',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'dg_recommendation',
        text: 'Approval Recommendation',
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
                    text: 'DG Recommendation',
                    iconCls: 'x-fa fa-chevron-circle-up',
                    approval_frm: 'productApprovalRecommFrm',
                    handler: 'getApplicationApprovalDetails',
                    vwcontroller: 'productregistrationvctr',
                    stores: '["productApprovalDecisionsStr"]',
                    table_name: 'tra_product_applications'
                }, {
                    text: 'Preview Application Details',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Preview Record',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Product Information',
                    winWidth: '40%',
                    isReadOnly: 1,
                    handler: 'editpreviewProductInformation'
                },  {
                    text: 'Application Documents',
                    iconCls: 'x-fa fa-file',
                    tooltip: 'Application Documents',
                    action: 'edit',
                    childXtype: '',
                    winTitle: 'Application Documents',
                    winWidth: '40%',
                    isReadOnly: 1,

                    document_type_id: '',
                    handler: 'showPreviousUploadedDocs'
                }]
            }
        }
    }]
});
