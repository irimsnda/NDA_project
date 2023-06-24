/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ImportExportApplicantDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'importexportapplicantdetailsfrm',
   
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'applicant_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            fieldLabel: 'Applicant Name',
            items: [
                {
                    xtype: 'textfield',
                    name: 'applicant_name',
                    readOnly: true,
                    columnWidth: 0.9
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-link',
                    columnWidth: 0.1,
                    tooltip: 'Link Applicant',
                    name: 'link_applicant',
                    applicantType: 'local',
                    childXtype: 'importexppermitapplicantselectiongrid',
                    winTitle:'Applicant Details',
                    winWidth:'70%',
                    handler: 'showApplicantSelectionList'



                }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Contact Person',
            readOnly: true,
            name: 'contact_person'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'TIN',
            readOnly: true,
            name: 'TIN'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'app_country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            readOnly: true,
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'app_region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            readOnly: true,
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'app_district_id',
            readOnly: true,
            store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            readOnly: true,
            name: 'app_physical_address'
        },
        {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Postal Address',
            name: 'postal_address'
        },
        {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Telephone',
            name: 'app_telephone'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
            readOnly: true,
            name: 'app_fax'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email',
            readOnly: true,
            name: 'app_email'
        },
        {
            xtype: 'textfield',
            readOnly: true,
            fieldLabel: 'Website',
            name: 'app_website'
        }
    ]
});