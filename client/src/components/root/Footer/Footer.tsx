import { InitContext } from 'global/context/InitContext';
import React, { useContext } from 'react';
import logoFooter from 'assets/images/presentation/logo_footer.svg';
import {
	ColumnFooter,
	FooterComp,
	GroupTitleFooter,
	GroupWrapper,
	InnerContainerFooter,
	LinkFooter,
	LogoFooterWrapper
} from './Footer.style';
import LangToggler from 'components/langToggler/LangToggler';

function Footer() {
	const lang = useContext(InitContext).state.lang.Root.Footer;

	return (
		<FooterComp>
			<InnerContainerFooter>
				<ColumnFooter firstColumn>
					<LogoFooterWrapper>
						<img src={logoFooter} alt="logo-footer" />
						<h1>TiKiu</h1>
					</LogoFooterWrapper>
					<LangToggler />
				</ColumnFooter>
				<ColumnFooter>
					<GroupWrapper>
						<GroupTitleFooter>{lang.Group1.Title}</GroupTitleFooter>
						{lang.Group1.Items.map((item: string, idx: number) => (
							<LinkFooter key={idx}>{item}</LinkFooter>
						))}
					</GroupWrapper>
				</ColumnFooter>
				<ColumnFooter>
					<GroupWrapper>
						<GroupTitleFooter>{lang.Group2.Title}</GroupTitleFooter>
						{lang.Group2.Items.map((item: string, idx: number) => (
							<LinkFooter key={idx}>{item}</LinkFooter>
						))}
					</GroupWrapper>
				</ColumnFooter>
				<ColumnFooter>
					<GroupWrapper>
						<GroupTitleFooter>{lang.Group3.Title}</GroupTitleFooter>
						{lang.Group3.Items.map((item: string, idx: number) => (
							<LinkFooter key={idx}>{item}</LinkFooter>
						))}
					</GroupWrapper>
				</ColumnFooter>
				<ColumnFooter>
					<GroupWrapper>
						<GroupTitleFooter>{lang.Group4.Title}</GroupTitleFooter>
						{lang.Group4.Items.map((item: string, idx: number) => (
							<LinkFooter key={idx}>{item}</LinkFooter>
						))}
					</GroupWrapper>
				</ColumnFooter>
			</InnerContainerFooter>
		</FooterComp>
	);
}
export default React.memo(Footer);
