/**
 * Created by Kip on 3/20/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.SurveillanceMeetingDetailsGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsAbstractGrid',
    xtype: 'surveillancemeetingdetailsgrid',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var recomm_id = record.get('screening_decision_id');
            if (recomm_id) {
                return 'valid-row';
            } else {
                return 'invalid-row';
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI',
        allowDeselect: false
    },
    listeners: {
        beforerender: {
            fn: 'setSurveillanceGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'tmeetingsampledetailsstr',
                proxy: {
                    url: 'surveillance/getPmsApplicationSamplesApprovalStages'
                }
            },
            isLoad: true
        }
    },
    tbar: [
        {
            xtype: 'tbspacer'
        },
        
    ],
    bbar:[{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        width: '50%',
        strict_mode: 0,
        doRefresh: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        },
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    },
    '->', {
        xtype: 'button',
        text: 'Uploaded Meeting Documents',
        iconCls: 'x-fa fa-upload',
        ui: 'soft-purple',
        name: 'save_btn', isReadOnly: 1,
        reference_table_name: 'tc_meeting_details',
        table_name: 'tc_meeting_uploaddocuments',
        handler: 'funcUploadTCMeetingtechnicalDocuments',
        document_type_id: 4,
        childXtype:'unstructureddocumentuploadsgrid',
        winTitle: 'Technical Meeting Documents Upload',
        winWidth: '80%',
        toaster: 0
    }],
    columns: [
        {
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
                        text: 'Sample/Product Info',
                        iconCls: 'x-fa fa-bars',
                        tooltip: 'Sample/Product Info',
                        action: 'edit',
                        handler: 'showEditSampleWindow',
                        childXtype: 'pirsampledetailstabpanel',
                        winTitle: 'Sample/Product Details',
                        isReadOnly: 1,
                        winWidth: '90%',
                        stores: '[]'
                    }
                    ]
                }
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'PIR Recommendation',
            dataIndex: 'pir_recomm',
            tdCls: 'wrap-text',
            width: 100
        },
        {
            xtype: 'gridcolumn',
            text: 'Screening Recommendation',
            dataIndex: 'screening_recomm',
            tdCls: 'wrap-text',
            width: 100
        }
    ]
});