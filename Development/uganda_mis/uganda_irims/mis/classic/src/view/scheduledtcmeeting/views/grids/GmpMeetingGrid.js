/**
 * Created by Kip on 5/13/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpMeetingGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpManagersAbstractGrid',
    xtype: 'gmpmeetinggrid',height: 400,
    
    selModel: {
        selType: 'checkboxmodel'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer'
    }],
    bbar:[{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        table_name: 'tra_gmp_applications',
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
    features: [{
        ftype: 'searching',
        mode: 'local',
        minChars: 2
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'gmpmeetingschedulinggridstr',
                proxy: {
                    url: 'gmpapplications/getTCMeetingSchedulingApplications'
                }
            },
            isLoad: true
        }
    },
    columns: [
        {
            text: 'Inspection Type',
            dataIndex: 'inspection_type',
            flex: 1
        },
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
                    items: [
                        {
                            text: 'Preview Details',
                            iconCls: 'x-fa fa-bars',
                            appDetailsReadOnly: 1,
                            handler: 'showGmpApplicationMoreDetails'
                        },{
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
                        }
                    ]
                }
            }
        }]
});