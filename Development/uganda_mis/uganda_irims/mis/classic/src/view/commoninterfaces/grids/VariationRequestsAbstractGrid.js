/**
 * Created by Softclans on 5/23/2019.
 */
Ext.define('Admin.view.commoninterfaces.grids.VariationRequestsAbstractGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'variationrequestsabstractgrid',
    controller: 'commoninterfacesVctr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    selModel: {
        selType: 'checkboxmodel'
    },
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
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'hiddenfield',
        name: 'application_code'
    },{
        xtype: 'hiddenfield',
        name: 'application_id'
    },  {
        xtype: 'button',
        text: 'Add Request',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_variation',
        winTitle: 'Amendment/Variation Request',
        childXtype: 'applicationvariationrequestsfrm',
        winWidth: '50%',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    listeners: {
        beforerender: {
            fn: 'setCommonGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'variationrequestsabstractstr',
                proxy: {
                    url: 'api/getApplicationVariationRequests'
                }
            },
            isLoad: true
        }
    },
    initComponent: function () {
        var defaultColumns = [
            {
                xtype: 'gridcolumn',
                dataIndex: 'variation_category',
                text: 'Variation Category',
                flex: 1,
                tdCls: 'wrap'
            },
            {
                xtype: 'gridcolumn',
                dataIndex: 'variation_type',
                text: 'Variation Type',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'proposed_variation',
                text: 'Proposed Variation',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype: 'gridcolumn',
                dataIndex: 'variation_background_information',
                text: 'Variation Background Information',
                flex: 1,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'status',
                text: 'Status',
                flex: 1,hidden: true,
                tdCls: 'wrap'
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'initial_file_name',
                text: 'File Name',
                flex: 1,
                tdCls: 'wrap'
            },{
                xtype:'actioncolumn',
                width:50,
                items: [{
                    iconCls: 'x-fa fa-download',
                    tooltip: 'Download Document',
                    ui:'soft-green',
                    text: 'Download Document',
                    handler: 'funcDOwnloadApplicationVariationDoc'
                }]
            }
        ];
        this.columns = defaultColumns.concat(this.columns);
        this.callParent(arguments);
    }
});
