/**
 * Created by Kip on 3/8/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.PMSCollectionSiteSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'surveillancevctr',
    xtype: 'pmscollectionsiteselectiongrid',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
    width: '100%',
    itemId: 'pmscollectionsiteselectiongridId',
    tbar: [
        {
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'region_id'
        },
        {
            xtype: 'button',
            name: 'add_premise',
            text: 'Add Premise',
            ui: 'soft-green',
            childXtype: 'newpmspremisefrm',
            winTitle: 'New Premise',
            winWidth: '70%',
            iconCls: 'x-fa fa-add',
            handler: 'showAddPremiseParamWinFrm'
        },{
            xtype: 'tbspacer',
            width: 20
        },
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green',
                'font-style': 'italic'
            }
        },
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('hiddenfield[name=section_id]').getValue();
                region_id = grid.down('hiddenfield[name=region_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id,
                region_id:region_id
            };
        }
    }],
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                storeId: 'PmspremiseSelectionStr',
                proxy: {
                    url: 'surveillance/getPmsPremisesList'
                }
            },
            isLoad: true
        },
        itemdblclick: 'loadSelectedPCollectionSite'
    },
    columns:[{
                xtype: 'gridcolumn',
                dataIndex: 'name',
                text: 'Premise Name',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'applicant_name',
                text: 'Applicant Name',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'premise_reg_no',
                text: 'Registration No',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'permit_no',
                text: 'Permit No',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'physical_address',
                text: 'Physical Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'postal_address',
                text: 'Postal Address',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'region_name',
                text: 'Region',
                flex: 1
            }, {
                xtype: 'gridcolumn',
                dataIndex: 'district_name',
                text: 'District',
                flex: 1
            }]
});
