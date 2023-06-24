/**
 * Created by Kip on 5/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.forms.ManufacturerDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'manufacturerdetailsfrm',
    controller: 'gmpapplicationsvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 3,
        labelAlign: 'top',
        allowBlank: false
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly',
            value: 1
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturer_id'
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'manufacturer_name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Manufacturer (Corporate) Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_manufacturer',
                    childXtype: 'manufacturersselectiongrid',
                    winTitle: 'Manufacturer Selection List',
                    handler: 'showAddGmpParamWinFrm',
                    winWidth: '90%',
                    margin: '30 0 0 0',
                    stores: '[]'
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Manufacturer Email'
        },
        {
            xtype: 'textfield',
            name: 'physical_address',
            fieldLabel: 'Corporate Address'
        },
        {
            xtype: 'textfield',
            name: 'contact_person',
            fieldLabel: 'Contact Person'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/country'
                        }
                    },
                    isLoad: true
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    regionStore.removeAll();
                    regionStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/region'
                        }
                    },
                    isLoad: false
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore(),
                        filterObj = {region_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    districtStore.removeAll();
                    districtStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: {
                    fn: 'setParamCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'parameters/district'
                        }
                    },
                    isLoad: false
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Manufacturer website',
            name: 'website',
            allowBlank: true
        }
    ]
});