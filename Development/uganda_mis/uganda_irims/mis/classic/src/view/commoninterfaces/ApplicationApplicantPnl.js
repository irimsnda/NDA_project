/**
 * Created by Kip on 2/6/2019.
 */
Ext.define('Admin.view.commoninterfaces.ApplicationApplicantPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationapplicantpnl',
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            hidden: true,
            dock: 'top',
            margin: 2,
            items: [
                {
                    xtype: 'tbspacer',
                    width: 2
                },
                {
                    xtype: 'fieldset',
                    title: 'Application Processing',
                    //checkboxToggle: true,
                    collapsible: false,
                    layout: 'column',
                    defaults: {
                        columnWidth: 0.33,
                        margin: 5
                    },
                    items: [
                        {
                            xtype: 'combo',
                            fieldLabel: 'Country',
                            labelWidth: 55,
                            width: 350,
                            readOnly: true,
                            name: 'application_country_id',
                            valueField: 'id',
                            displayField: 'name',
                            queryMode: 'local',
                            forceSelection: true,
                            labelStyle: 'font-weight:bold',
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            url: 'commonparam/getCommonParamFromTable'
                                        }
                                    },
                                    isLoad: false
                                },
                                afterrender: function () {
                                    var store = this.getStore(),
                                        filterObj = {id: 36},
                                        filterStr = JSON.stringify(filterObj);
                                    store.removeAll();
                                    store.load({params: {table_name: 'par_countries', filters: filterStr}});
                                    this.setValue(36);
                                },
                                change: function (cmb, newVal) {
                                    var store = this.getStore(),
                                        filterObj = {country_id: newVal},
                                        filterStr = JSON.stringify(filterObj),
                                        panel = cmb.up('applicationapplicantpnl'),
                                        regions_store = panel.down('combo[name=application_region_id]').getStore();
                                    regions_store.removeAll();
                                    regions_store.load({params: {table_name: 'par_regions', filters: filterStr}});
                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Region',
                            labelWidth: 50,
                            width: 350,
                            name: 'application_region_id',
                            valueField: 'id',
                            displayField: 'name',
                            queryMode: 'local',
                            forceSelection: true,
                            labelStyle: 'font-weight:bold',
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            url: 'commonparam/getCommonParamFromTable'
                                        }
                                    },
                                    isLoad: false
                                },
                                change: function (cmb, newVal) {
                                    var store = cmb.getStore(),
                                        record = store.getById(newVal),
                                        zone_id = record.get('zone_id'),
                                        panel = cmb.up('applicationapplicantpnl');
                                    panel.down('combo[name=zone_id]').setValue(zone_id);

                                }
                            }
                        },
                        {
                            xtype: 'combo',
                            fieldLabel: 'Zone',
                            labelWidth: 45,
                            width: 350,
                            name: 'zone_id',
                            valueField: 'id',
                            displayField: 'name',
                            readOnly: true,
                            queryMode: 'local',
                            forceSelection: true,
                            labelStyle: 'font-weight:bold',
                            listeners: {
                                beforerender: {
                                    fn: 'setOrgConfigCombosStore',
                                    config: {
                                        pageSize: 1000,
                                        proxy: {
                                            extraParams: {
                                                model_name: 'Zone'
                                            }
                                        }
                                    },
                                    isLoad: true
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    items: [
        {
            xtype: 'applicantdetailsfrm'
        }
    ]
});