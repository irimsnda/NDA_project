/**
 * Created by Kip on 5/8/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManSitesSelectionGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'gmpapplicationsvctr',
    xtype: 'mansitesselectiongrid',
    autoScroll: true,
    autoHeight: true,
    frame: true,
    height: 550,
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
    tbar: [
        {
            xtype: 'tbspacer',
            width: 5
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'gmp_type_id'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Manufacturer',
            valueField: 'manufacturer_id',
            displayField: 'manufacturer_namecountry',
            width: 450,
            forceSelection: true,
            anyMatch: true,
            name: 'manufacturer_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setGmpApplicationCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'productregistration/onLoadManufacturingSitesDetails'
                        }
                    },
                    isLoad: true
                },
                change: function () {
                    this.up('grid').getStore().load();
                }
            },
            triggers: {
                clear: {
                    type: 'clear',
                    hideWhenEmpty: true,
                    hideWhenMouseOut: false,
                    clearOnEscape: true
                }
            }
        },
        {
            xtype: 'tbspacer',
            width: 20
        },
        '-',
        {
            xtype: 'displayfield',
            value: 'Double click to select!!',
            fieldStyle: {
                'color': 'green'
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
                section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                manufacturer_id = grid.down('combo[name=manufacturer_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id,
                manufacturer_id: manufacturer_id
            };
        }
    }],
    /* features: [{
         ftype: 'searching',
         minChars: 2,
         mode: 'local'
     }],*/
    plugins: [{
        ptype: 'filterfield'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                remoteFilter: true,
                proxy: {
                    url: 'gmpapplications/getManSitesList'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        text: 'Manufacturer Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Manufacturing Site Name',
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
        dataIndex: 'country',
        text: 'Country',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'region',
        text: 'Region',
        flex: 1
    }]
});

